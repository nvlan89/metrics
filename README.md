# Metrics
## Run on local

```sh
cd root_folder;
touch .env;
vim .env
```
update env content

## List rest api endpoint

### add metric
- post localhost:3000/v1/metrics
-- body {
    "type": "temperature",
    "value": 2,
    "date": "2023-01-31T17:05:01.000Z",
    "unit": "C"
}
### Get all metric data
- localhost:3000/v1/metrics?type=distance
- localhost:3000/v1/metrics?type=distance&unit=cm
- localhost:3000/v1/metrics?type=distance&limit=20
- localhost:3000/v1/metrics?type=distance&unit=cm&page=1
- localhost:3000/v1/metrics?type=temperature
- localhost:3000/v1/metrics?type=temperature&unit=c

### Query metric data
- localhost:3000/v1/metrics?type=distance&period=1
- localhost:3000/v1/metrics?type=distance&period=1&unit=cm
- localhost:3000/v1/metrics?type=temperature
