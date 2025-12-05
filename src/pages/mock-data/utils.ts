/**
 * 将JSON数组转换为SQL建表语句和插入语句
 * @param {Array} jsonArray - 包含多个JSON对象的数组
 * @param {string} tableName - 目标SQL表名
 * @returns {Object} 包含createTableStatement和insertStatements的对象
 */
export function jsonToSQL(
  jsonArray: Array<Record<string, any>>,
  tableName: string
): any {
  if (!jsonArray || jsonArray.length === 0) {
    throw new Error('JSON数组不能为空');
  }

  // 使用第一个对象来推断字段和类型
  const sampleObject: Record<string, any> = jsonArray[0];
  const fields: string[] = Object.keys(sampleObject);

  // 1. 生成建表语句
  // 简单类型映射：可根据需要扩展这个映射关系
  const typeMap: Record<string, string> = {
    number: 'INT',
    string: 'VARCHAR(255)',
    boolean: 'BOOLEAN'
    // 对于更复杂的情况（如数组、对象），可能需要特殊处理或使用JSON类型
  };

  let createTableFields = fields
    .map((field) => {
      // 检查样本中该字段的数据类型
      const fieldType: string = typeof sampleObject[field];
      const sqlType = typeMap[fieldType] || 'VARCHAR(255)'; // 默认使用VARCHAR
      return `\`${field}\` ${sqlType}`;
    })
    .join(',\n  ');

  const createTableStatement = `CREATE TABLE \`${tableName}\` (
  ${createTableFields}
);`;

  // 2. 生成插入语句
  const insertStatements = jsonArray.map((obj: Record<string, any>) => {
    const keys = Object.keys(obj);
    const values = keys.map((key) => {
      const value = obj[key];
      // 对值进行转义，防止SQL注入和语法错误
      if (value === null || value === undefined) {
        return 'NULL';
      } else if (typeof value === 'string') {
        // 转义字符串中的单引号，并用单引号包裹
        return `'${value.replace(/'/g, "''")}'`;
      } else if (typeof value === 'number') {
        return value;
      } else if (typeof value === 'boolean') {
        return value ? 1 : 0;
      } else {
        // 对于对象、数组等复杂类型，可以将其序列化为JSON字符串存储
        return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
      }
    });

    return `INSERT INTO \`${tableName}\` (${keys.map((k) => `\`${k}\``).join(', ')}) VALUES (${values.join(', ')});`;
  });

  return {
    createTable: createTableStatement,
    inserts: insertStatements
  };
}
