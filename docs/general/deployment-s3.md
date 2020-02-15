# Automated Deployment to AWS S3 

A helper script that will deploy `build` folder to `s3` and invalidates caches of `service worker`, `s3` and `cloudfront` to avoid [not updating problem]

`deploy-to-s3.sh`: 

```sh
# Enable printing executed commands
set x

# Get AWS PROFILE, S3 Bucket and CloudFront Id from environment variables  or write it down statically
aws_profile=$AWS_PROFILE
s3_bucket=$S3_BUCKET_NAME
cf_id=$CLOUDFRONT_ID

echo Profile: $aws_profile
echo S3_Bucket: $s3_bucket
echo CloudFront Distribution: $cf_id

if [ -z "$aws_profile" ]; then
  echo AWS_PROFILE not found
  exit
fi
if [ -z "$s3_bucket" ]; then
  echo S3_BUCKET not found
  exit
fi

#set env variable for aws cli
export AWS_PROFILE=$aws_profile

echo Synching Build Folder: $s3_bucket...
aws s3 sync build/ s3://$s3_bucket --delete --cache-control max-age=31536000,public

echo Adjusting cache...
aws s3 cp s3://$s3_bucket/sw.js s3://$s3_bucket/sw.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
aws s3 cp s3://$s3_bucket/index.html s3://$s3_bucket/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read

if [ ! -z "$cf_id" ]; then
    echo Invalidating cloudfront cache
    aws cloudfront create-invalidation --distribution-id $cf_id --paths "/*"
fi

```
Run the command in terminal 

`$ sh deploy-to-s3.sh`


**Note:** `AWS_PROFILE` must have access permissions to followings

Example policy: 
```
   {
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:PutObject", "s3:PutObjectAcl", "s3:DeleteObject"],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      ]
    },
    {
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },

```
[not updating problem]: <https://github.com/react-boilerplate/react-boilerplate/issues/852>
