resource "aws_s3_bucket" "blog" {
  bucket = "${var.project}-prod-${var.region}"
  acl    = "private"
}

resource "aws_s3_bucket_policy" "blog_cloudfront" {
  bucket = "${aws_s3_bucket.blog.id}"
  policy = "${data.aws_iam_policy_document.blog_cloudfront.json}"
}

data "aws_iam_policy_document" "blog_cloudfront" {
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.blog.arn}/*",
    ]

    principals {
      type = "AWS"

      identifiers = [
        "${aws_cloudfront_origin_access_identity.blog.iam_arn}",
      ]
    }
  }

  statement {
    effect = "Allow"

    actions = [
      "s3:ListBucket",
    ]

    resources = [
      "${aws_s3_bucket.blog.arn}",
    ]

    principals {
      type = "AWS"

      identifiers = [
        "${aws_cloudfront_origin_access_identity.blog.iam_arn}",
      ]
    }
  }
}
