#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';
import { DatabaseStack } from '../lib/database-stack';

const app = new cdk.App();

const frontendStack = new FrontendStack(app, 'FrontendStack');
const backendStack = new BackendStack(app, 'BackendStack');
const databaseStack = new DatabaseStack(app, 'DatabaseStack');
