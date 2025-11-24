export function markdownTableToCSV(markdownText: string) {
  const lines = markdownText.trim().split('\n');
  // 过滤掉分隔符行（例如 |------|------|），并处理数据行
  const dataLines = lines.filter((line) => !line.match(/^\s*\|?\s*-+\s*\|/));

  return dataLines
    .map((line) => {
      // 清理行首尾的管道符号并按管道符号分割单元格
      const cells = line
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((cell) => cell.trim());
      // 处理单元格内的引号和逗号，并用双引号包围
      return cells.map((cell) => `${cell.replace(/"/g, '""')}`).join(',');
    })
    .join('\n');
}

// CSV转Markdown
export const csvToMarkdown = (text: string) => {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return '';

  const rows = lines.map((line) => {
    const cells = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    cells.push(currentCell.trim());
    return cells;
  });

  if (rows.length === 0) return '';

  const header = rows[0];
  const separator = header.map(() => '---').join(' | ');
  const headerRow = `| ${header.join(' | ')} |`;
  const separatorRow = `| ${separator} |`;

  const dataRows = rows.slice(1).map((row) => `| ${row.join(' | ')} |`);

  return [headerRow, separatorRow, ...dataRows].join('\n');
};

// Markdown转JSON
export const markdownToJson = (text: string) => {
  const lines = text.trim().split('\n');
  const data = [];
  let headers: Array<string> = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*\|?\s*-+\s*\|/)) continue;

    const cells = line
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((cell) => cell.trim());

    if (i === 0) {
      headers = cells;
    } else if (cells.length === headers.length) {
      const obj: any = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = cells[index] || '';
      });
      data.push(obj);
    }
  }

  return JSON.stringify(data, null, 2);
};

// JSON转Markdown
export const jsonToMarkdown = (text: string) => {
  try {
    const data = JSON.parse(text);
    if (!Array.isArray(data) || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;

    const dataRows = data.map(
      (item) => `| ${headers.map((header) => item[header] || '').join(' | ')} |`
    );

    return [headerRow, separatorRow, ...dataRows].join('\n');
  } catch (e) {
    return '无效的JSON格式';
  }
};

// CSV转JSON
export const csvToJson = (text: string) => {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return '[]';

  const rows = lines.map((line) => {
    const cells = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    cells.push(currentCell.trim());
    return cells;
  });

  if (rows.length === 0) return '[]';

  const headers: Array<string> = rows[0];
  const data = rows.slice(1).map((row) => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });

  return JSON.stringify(data, null, 2);
};

// JSON转CSV
export const jsonToCsv = (text: string) => {
  try {
    const data = JSON.parse(text);
    if (!Array.isArray(data) || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const headerRow = headers
      .map((header) =>
        header.includes(',') || header.includes('"')
          ? `"${header.replace(/"/g, '""')}"`
          : header
      )
      .join(',');

    const dataRows = data.map((item) =>
      headers
        .map((header) => {
          const value = item[header] || '';
          return value.includes(',') || value.includes('"')
            ? `"${String(value).replace(/"/g, '""')}"`
            : String(value);
        })
        .join(',')
    );

    return [headerRow, ...dataRows].join('\n');
  } catch (e) {
    return '无效的JSON格式';
  }
};
