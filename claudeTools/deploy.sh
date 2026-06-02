#!/usr/bin/env bash
# Deploy my.gymnasticbodies.com to production S3 + invalidate CloudFront.
# Usage: bash claudeTools/deploy.sh

set -e

S3_BUCKET="my.react2026"
CF_DISTRIBUTION="E2TAHYRIUSC1ZN"
AWS_REGION="us-east-1"

# Activate Node 16 via nvm (required — Node 22 breaks CRA build)
export NVM_DIR="$HOME/.config/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 16

echo "==> Building (production)..."
REACT_APP_API='https://api.gymnasticbodies.com' REACT_APP_IS_PRODUCTION='production' npm run build

echo "==> Syncing to s3://$S3_BUCKET ..."
aws s3 sync build/ "s3://$S3_BUCKET" \
  --delete \
  --region "$AWS_REGION"

echo "==> Invalidating CloudFront ($CF_DISTRIBUTION)..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CF_DISTRIBUTION" \
  --paths "/*" \
  --region "$AWS_REGION" \
  --query 'Invalidation.Id' \
  --output text)

echo "==> Done. Invalidation ID: $INVALIDATION_ID (status: InProgress — typically 1-2 min)"
