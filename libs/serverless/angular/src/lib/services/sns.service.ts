import * as AWS from 'aws-sdk';

const endpoint = process.env.IS_OFFLINE ? { endpoint: 'http://127.0.0.1:8081' }: {};


export class SNSService {
  private sns: AWS.SNS;

  constructor(
    private awsRegion = process.env.SPECIFIED_AWS_REGION,
    private awsAccountId = process.env.AWS_ACCOUNT_ID,
  ) {
    this.sns = new AWS.SNS({ region: this.awsRegion, ...endpoint })
  }

  async publish(topic: string, message: any): Promise<any> {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }

    const params = {
      Message: JSON.stringify(message),
      TopicArn: `arn:aws:sns:${this.awsRegion}:${this.awsAccountId}:${topic}`
    }
    return this.sns.publish(params).promise()
  }
}