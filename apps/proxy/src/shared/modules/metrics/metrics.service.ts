import { Injectable } from '@nestjs/common';
import * as Influx from 'influx';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MetricsService {
    constructor(private configService: ConfigService) { }

    private influx = new Influx.InfluxDB(this.configService.get<string>('INFLUX_URL') || 'http://localhost:8086/telegraf');

    async send(measurement: string, fields: Record<string, any>): Promise<void> {
        this.influx.writePoints([{
            measurement,
            fields
        }]);
    }
}

// const {InfluxDB} = require('@influxdata/influxdb-client')

// // You can generate a Token from the "Tokens Tab" in the UI
// const token = 'mpymPNYrPubVaIwynaOqOK0j8xOJpGwLg6xjkX4aH1PlN-ed06kUp6OzzhfyXwiQTJ9gT5zi8PPetRMVJu91SA=='
// const org = 'andrew@kpilens.com'
// const bucket = 'andrew's Bucket'

// const client = new InfluxDB({url: 'https://us-central1-1.gcp.cloud2.influxdata.com', token: token})

// const {Point} = require('@influxdata/influxdb-client')
// const writeApi = client.getWriteApi(org, bucket)
// writeApi.useDefaultTags({host: 'host1'})

// const point = new Point('mem')
//   .floatField('used_percent', 23.43234543)
// writeApi.writePoint(point)
// writeApi
//     .close()
//     .then(() => {
//         console.log('FINISHED')
//     })
//     .catch(e => {
//         console.error(e)
//         console.log('\\nFinished ERROR')
//     })