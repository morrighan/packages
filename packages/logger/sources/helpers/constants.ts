// Node.js built-in APIs.
import cluster from 'cluster';
import { env as environments } from 'process';
import { isMainThread } from 'worker_threads';

// Type definitions.
export const ExecutionMode = {
    DevelopmentMode: 'development',
    ProductionMode: 'production'
} as const;

export const ClusteringMode = {
    MasterProcess: 0,
    WorkerProcess: 1
} as const;

export const ThreadingMode = {
    MainThread: 0,
    WorkerThread: 1
} as const;

export type ExecutionMode = typeof ExecutionMode[keyof typeof ExecutionMode];
export type ClusteringMode = typeof ClusteringMode[keyof typeof ClusteringMode];
export type ThreadingMode = typeof ThreadingMode[keyof typeof ThreadingMode];

// Exportings.
export const executionMode = environments.NODE_ENV as ExecutionMode ?? ExecutionMode.DevelopmentMode;

export const clusteringMode: ClusteringMode = cluster.isPrimary ?? cluster.isMaster
    ? ClusteringMode.MasterProcess
    : ClusteringMode.WorkerProcess;

export const threadingMode: ThreadingMode = isMainThread
    ? ThreadingMode.MainThread
    : ThreadingMode.WorkerThread;
