import { ConnectionPool, config, Transaction, Request } from 'mssql';

interface ParamsSql {
  name: string;
  value?: any;
  output?: boolean;
}

class SqlHelper {
  _connection: ConnectionPool | any;
  _transaction: Transaction | any;
  private _isTransactionStarted = false;

  constructor(private config: config | object | any) {
    this.createPoolConnection();
  }
  private async createConnection() {
    if (!this._connection.connected) await this._connection.connect();
  }

  private async createPoolConnection() {
    if (!this._connection) {
      this._connection = new ConnectionPool(this.config);
    } else {
      if (!this._connection.connected && !this._connection.connecting) {
        this._connection = new ConnectionPool(this.config);
      }
    }
  }
  async executeStoreProcedure(procedure: string, params?: ParamsSql[]): Promise<object | any> {
    try {
      await this.createConnection();

      const request = new Request(this._isTransactionStarted ? this._transaction : this._connection);

      if (params) {
        params.forEach((v: ParamsSql) => {
          if (!v.output) request.input(v.name, v.value);
          if (v.output) request.output(v.name, v.value);
        });
      }
      return await request.execute(procedure);
    } catch (error) {
      throw error;
    } finally {
      if (!this._isTransactionStarted) this._connection?.close();
    }
  }
  async executeQuery(query: string, params?: ParamsSql[]): Promise<object | any> {
    try {
      await this.createConnection();
      const request = new Request(this._isTransactionStarted ? this._transaction : this._connection);

      if (params) {
        params.forEach((v: ParamsSql) => {
          request.input(v.name, v.value);
        });
      }

      return await request.query(query);
    } catch (error) {
      throw error;
    } finally {
      if (!this._isTransactionStarted) this.close();
    }
  }

  async beginTransaction() {
    await this.createConnection();
    if (this._isTransactionStarted) throw Error('Transaction is already started.');
    this._transaction = new Transaction(this._connection);
    await this._transaction.begin();
    this._isTransactionStarted = true;
  }

  async commit() {
    if (!this._isTransactionStarted) throw new Error('No transaction started.');
    await this._transaction.commit();
    this._transaction = undefined;
    this._isTransactionStarted = false;
    await this.close();
  }
  async rollback() {
    if (!this._isTransactionStarted) throw new Error('No transaction started.');
    await this._transaction.rollback();
    this._transaction = undefined;
    this._isTransactionStarted = false;
    await this.close();
  }
  private async close() {
    if (this._connection.connected) await this._connection?.close();
  }
}
export { SqlHelper, ParamsSql };
