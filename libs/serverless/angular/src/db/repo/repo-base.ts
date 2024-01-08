/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { DynamoDBClient, DynamoDBClientConfig, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ExecuteStatementCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
// import { unmarshall } from '@aws-sdk/util-dynamodb';
// import { fromIni } from "@aws-sdk/credential-providers";
import * as pluralize from 'pluralize';

import { DynamoItem } from '../models/dynamo-item';

type keyedFrom<T> = keyof T|string;


const clientConfig = {
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 5000,
    socketTimeout: 5000,
  }),
  // credentialDefaultProvider: {}
  credentials: {
    accessKeyId: process.env.MY_AWS_AKI,
    secretAccessKey: process.env.MY_AWS_SAK
  }
} as DynamoDBClientConfig;

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

class DDB {

  static client = new DynamoDBClient(clientConfig);

  static docClient = DynamoDBDocumentClient.from(DDB.client, translateConfig);
}

export abstract class RepoBase<T extends DynamoItem> {

  abstract partitionKey: keyedFrom<T>;
  abstract sortKey: keyedFrom<T>;

  secondaryKey: keyedFrom<T>;
  overrideTableName = '';

  get tableName () {
    return [
      process.env.DDB_TABLE_PREFIX,
      this.overrideTableName || pluralize(this.modelConstructor.name.toLowerCase())
    ].filter(x => x).join('.');
  }

  constructor (
    private modelConstructor : new (...args) => T,
    private ddbDocClient: DynamoDBDocumentClient = DDB.docClient
  ) {
    // this.ddbClient.send
    // this.ddbDocClient.send
  }

  // private getUpdateClause (item) {
  //   const params = {
  //     TableName: this.tableName,
  //     Key: { [this.partitionKey]: item[this.partitionKey], [this.sortKey]: item[this.sortKey] },
  //     ExpressionAttributeNames: {},
  //     ExpressionAttributeValues: {},
  //     UpdateExpression: 'SET'
  //   };

  //   // set last edited date to now
  //   item.lastEditedDate = Date.now();

  //   Object.keys(item).forEach(key => {
  //     if (key !== this.partitionKey && key !== this.sortKey) {
  //       const ean = `#${key}`;
  //       const eav = `:${key}`;
  //       params.ExpressionAttributeNames[ean] = key;
  //       params.ExpressionAttributeValues[eav] = item[key];
  //       params.UpdateExpression += ` ${ean} = ${eav},`
  //     }
  //   });

  //   params.UpdateExpression = params.UpdateExpression.slice(0, -1);
  //   console.log('UPDATE EXPRESSION', params);
  //   return params;
  // }

  private getValueForCondition (condition, value) {
    switch (condition.toLowerCase()) {

      case 'in': {
        const joinableValues = value.map(v => {
          if (typeof v === 'number') {
            return v;
          }
          if (typeof v === 'string') {
            return `'${v}'`;
          }
          return v;
        });
        return `[${joinableValues.join(', ')}]`;
      }

      case 'between': {
        if (value.length !== 2 || (typeof value[0] !== 'number' || typeof value[1] !== 'number')) {
          throw new Error(`Cannot use the ${condition} operator with more than 2 values`);
        }
        return value.join(' AND ');
      }

      default: {
        if (typeof value === 'number') {
          return value;
        } else if (typeof value === 'string') {
          return `'${value.replace(/'/g, "''")}'`;
        } else {
          return value;
        }
      }

    }
  }

  private convertToWhereClause (expression: any[], whereClause = '') {
    while (expression.length > 0) {
      const term = expression.shift();
      if (typeof term === 'object') {
        if (Array.isArray(term)) {
          whereClause += `${this.convertToWhereClause(term, whereClause)})`;
        } else {
          whereClause += '(';
          const joiner = (term.$join || 'and').toUpperCase();
          delete term.$join;

          const cond = (term.$condition || '=').toUpperCase();
          delete term.$condition;

          const filterExpressionParts = Object.keys(term).map(key => {
            const value = this.getValueForCondition(cond, term[key]);
            return `"${key}" ${cond} ${value}`;
          });

          whereClause += `${filterExpressionParts.join(` ${joiner.trim().toUpperCase()} `)})`;
        }

      } else if (typeof term === 'string') {
        whereClause += ` ${term.trim().toUpperCase()} `;
      }

    }
    return whereClause;
  }

  private getPartiQLValue(value) {
    if (typeof value === 'number' ||
        typeof value === 'boolean') {
        value = `${value}`;
    } else if (typeof value === 'object') {
        value = `${JSON.stringify(value)}`;
    } else if (typeof value === 'string') {
        value = `'${value.replace(/'/g, "''")}'`;
    }
    return value;
  }

  async selectAll (
    { expressions, projection = ['*'], secondaryIndexName = '', config = {} }:
    { expressions: any[]; projection?: string[]; secondaryIndexName?: string; config?: {}; }
  ): Promise<any> {
    console.log('SELECTING ALL BY EXPRESSION & PROJECTION: ', expressions, projection);

    const whereClause = this.convertToWhereClause(expressions);
    console.log('SELECTING WHERE CLAUSE: ', whereClause);

    const projections = projection[0] === '*' ? '*' : projection.map(p => `"${p}"`).join(', ');

    const tableNameParts = [
      `"${this.tableName}"`,
      secondaryIndexName ? `"${secondaryIndexName}"` : secondaryIndexName
    ].filter(x=>x).join('.');

    const Statement = [
      `SELECT ${projections}`,
      `FROM ${tableNameParts}`,
      `WHERE ${whereClause}`
    ].join(' ');

    console.log('SELECTING OVERALL STATEMENT: ', Statement);
    const eComm = new ExecuteStatementCommand({ Statement }) as any;
    const result = await this.ddbDocClient.send(eComm, config) as any;

    console.log('SELECTED RESULT: ', result);
    
    return (result.Items && result.Items.length) ? result.Items: [];
  }

  async putItem (item: T): Promise<any> {
    // item = item.toItem();
    // if (!item.createdDate) {
    //   item.createdDate = Date.now();
    // }
    // item.lastEditedDate = Date.now();

    // console.log('PUTTING ITEM: ', item);
    // const putItemCommand = new PutItemCommand({
    //   TableName: this.tableName,
    //   Item: item
    // } as any)
    // return this.ddbDocClient.send(putItemCommand as any);

    try {
      if (!item.createdDate) {
        item.createdDate = Date.now();
      }
      item.lastEditedDate = Date.now();
      item = (item.toItem) ? item.toItem() : item;
      console.debug('PUTTING ITEM: ', item);
      const putCommand = new PutCommand({
        TableName: this.tableName,
        Item: item,
      } as any);

      // write item
      await DDB.docClient.send(putCommand as any);

      return Promise.resolve(true);
    } catch(ex) {
      console.debug('ERROR PUTTING ITEM:', item);
      console.error('EXCEPTION: ', ex);
      return Promise.reject(false);
    }
  }

  async updateItem(obj: Partial<T> | string | any, config = {}) {
    console.log('UPDATING ITEM: ', obj);
    if (obj.toItem) {
      obj = obj.toItem();
    }
    const setters = Object.keys(obj)
      .filter((key) => key !== this.partitionKey && key !== this.sortKey)
      .map((key) => {
        return `SET "${key}"=${this.getPartiQLValue(obj[key])}`;
      });

    const partitionKeyValue = this.getPartiQLValue(obj[this.partitionKey]);
    const sortKeyValue = this.getPartiQLValue(obj[this.sortKey]);
    const Statement = [
      `UPDATE "${this.tableName}"`,
      `${setters.join('\n')}`,
      `WHERE "${String(this.partitionKey)}"=${
        partitionKeyValue
      } AND "${String(this.sortKey)}"=${sortKeyValue}`,
      `RETURNING ALL NEW *`
    ].join('\n');


    console.log('UPDATE STATEMENTS: ', Statement);


    const updateResult = await this.ddbDocClient.send(
      new ExecuteStatementCommand({ Statement }) as any,
      config
    ) as any;

    console.log('UPDATE RESULT: ', updateResult);
    let items: any[] = [];
    if (updateResult?.Items?.length) {
      items = updateResult.Items;
    }
    return Promise.resolve(items);
  }

  // async updateItem (item: Partial<T> | string, config = {}) {
  //   // item = item.toString();

  //   console.log('UPDATING ITEM: ', item);
  //   const setters = Object.keys(item)
  //     .filter(key => key !== this.partitionKey && key !== this.sortKey)
  //     .map(key => {
  //       let value;
  //       if (typeof item[key] === 'number') {
  //         value = `${item[key]}`;
  //       }
  //       if (typeof item[key] === 'object') {
  //         value = `${JSON.stringify(item[key])}`;
  //       }
  //       if (typeof item[key] === 'string') {
  //         value = `'${item[key]}'`;
  //       }
  //       return `SET "${key}"=${value}\n`;
  //     });

  //   const Statement = [
  //     `UPDATE "${this.tableName}"`,
  //     `${setters.join('')}`,
  //     `WHERE "${String(this.partitionKey)}"='${(item as any)[this.partitionKey]}' AND "${String(this.sortKey)}"=${(item as any)[this.sortKey]}`
  //   ].join('\n');

  //   console.log('UPDATE STATEMENT: ', Statement);

  //   const result = await this.ddbDocClient.send(new ExecuteStatementCommand({ Statement }) as any, config);

  //   console.log('UPDATE RESULT: ', result);
  //   return Promise.resolve(result);
  // }

}
