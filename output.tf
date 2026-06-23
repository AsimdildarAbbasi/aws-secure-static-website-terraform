output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "s3_bucket_id" {
  description = "The ID of the S3 bucket hosting the static files."
  value       = aws_s3_bucket.static-website-asim-abbasi.id
}
