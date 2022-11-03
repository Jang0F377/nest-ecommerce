import { RequestTimeoutException } from '@nestjs/common';
import { promisify } from 'util';
import { logException } from './error.utils';

export interface TaskStatus<T> {
  done: boolean;
  value?: T | null;
}

export interface Task<T> {
  run(): Promise<TaskStatus<T>>;
  description: string;
}

export interface RetryOptions {
  maxTries?: number;
  interval?: number;
}

export async function retry<T>(
  task: Task<T>,
  { maxTries = 10, interval = 100 }: RetryOptions = {},
): Promise<T> {
  if (maxTries < 1) maxTries = 1;
  let triesLeft = maxTries;

  while (true) {
    const status = await task.run();
    if (status.done) return status.value!;
    if (--triesLeft > 0) {
      await sleep(interval);
    } else {
      const msg = `Failed to ${task.description} after ${
        maxTries * interval
      } ms`;
      logException({ message: msg });
      throw new RequestTimeoutException();
    }
  }
}

export const sleep = promisify(setTimeout);
