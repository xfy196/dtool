<script setup lang="ts">
  import { ref, computed, useTemplateRef } from 'vue';
  import type { DataTableColumns, DataTableInst } from 'naive-ui';
  import { useMessage } from 'naive-ui';
  import Mock from 'mockjs';
  import { jsonToSQL } from './utils.ts';
  import { useDownloadFile } from '@/composable/downloadFile.ts';
  import { filesize } from 'filesize';
  import { encode as toonEncode } from '@toon-format/toon';

  type Category = 'personal' | 'business' | 'tech' | 'custom';

  type FieldKey =
    | 'name'
    | 'email'
    | 'phone'
    | 'idCard'
    | 'gender'
    | 'age'
    | 'birthday'
    | 'address'
    | 'company'
    | 'position'
    | 'salary'
    | 'department'
    | 'hireDate'
    | 'productName'
    | 'price'
    | 'productCategory'
    | 'stock'
    | 'ip'
    | 'url'
    | 'method'
    | 'statusCode'
    | 'responseTime'
    | 'customKey'
    | 'customValue'
    | 'remark'
    | (string & {}); // 允许自定义字段键名

  type MockRow = Record<string, string | number>;

  // 自定义字段配置
  interface CustomField {
    id: string;
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'date';
    rule: string;
  }

  const extMap = {
    json: 'json',
    table: 'xlsx',
    csv: 'csv',
    sql: 'sql',
    toon: 'toon'
  };
  const message = useMessage();

  const tableRef = useTemplateRef<DataTableInst>('tableRef');

  const loading = ref(false);
  const count = ref<number | null>(10);
  const outputFormat = ref<'json' | 'csv' | 'sql' | 'toon'>('json');

  const activeCategory = ref<Category>('personal');

  const fieldConfigs: { label: string; key: FieldKey; category: Category }[] = [
    // 个人信息
    { label: '姓名', key: 'name', category: 'personal' },
    { label: '邮箱', key: 'email', category: 'personal' },
    { label: '手机号', key: 'phone', category: 'personal' },
    { label: '身份证号', key: 'idCard', category: 'personal' },
    { label: '性别', key: 'gender', category: 'personal' },
    { label: '年龄', key: 'age', category: 'personal' },
    { label: '生日', key: 'birthday', category: 'personal' },
    { label: '地址', key: 'address', category: 'personal' },
    // 商业数据
    { label: '公司名称', key: 'company', category: 'business' },
    { label: '职位', key: 'position', category: 'business' },
    { label: '部门', key: 'department', category: 'business' },
    { label: '薪资', key: 'salary', category: 'business' },
    { label: '入职日期', key: 'hireDate', category: 'business' },
    // 商品 / 订单相关
    { label: '商品名称', key: 'productName', category: 'business' },
    { label: '价格', key: 'price', category: 'business' },
    { label: '商品分类', key: 'productCategory', category: 'business' },
    { label: '库存', key: 'stock', category: 'business' },
    // 技术 / API 数据
    { label: 'IP 地址', key: 'ip', category: 'tech' },
    { label: '请求 URL', key: 'url', category: 'tech' },
    { label: '请求方法', key: 'method', category: 'tech' },
    { label: '状态码', key: 'statusCode', category: 'tech' },
    { label: '响应时间(ms)', key: 'responseTime', category: 'tech' }
  ];

  const selectedFields = ref<FieldKey[]>(['name', 'email', 'phone']);
  const data = ref<MockRow[]>([]);
  const customFields = ref<CustomField[]>([]);

  const showAddCustomFieldModal = ref(false);
  const editingCustomField = ref<CustomField | null>(null);
  const newCustomField = ref({
    name: '',
    label: '',
    type: 'string' as CustomField['type'],
    rule: '@word(3, 10)'
  });

  const fieldMockMap: Record<FieldKey, any> = {
    name: '@cname',
    email: '@email',
    phone: '@string("number", 11)',
    idCard: '@id',
    gender: '@pick(["男", "女"])',
    age: '@integer(18,60)',
    birthday: '@date("yyyy-MM-dd")',
    address: '@county(true)',
    company: '@ctitle(4,8)公司',
    position: '@ctitle(3,6)',
    department: '@pick(["技术部","市场部","运营部","人力资源部"])',
    salary: '@integer(5000,30000)',
    hireDate: '@date("yyyy-MM-dd")',
    productName: '@ctitle(3,8)',
    price: '@float(10, 9999, 2, 2)',
    productCategory: '@pick(["电子产品","家用电器","服饰鞋帽","图书文娱"])',
    stock: '@integer(0,1000)',
    ip: '@ip',
    url: '@url',
    method: '@pick(["GET","POST","PUT","DELETE"])',
    statusCode: '@pick([200,201,400,401,403,404,500])',
    responseTime: '@integer(10,2000)',
    customKey: '@word(3,8)',
    customValue: '@sentence(3,8)',
    remark: '@cparagraph(1,2)'
  };

  const fieldLabelMap = fieldConfigs.reduce<Record<FieldKey, string>>(
    (acc, cur) => {
      acc[cur.key] = cur.label;
      return acc;
    },
    {} as Record<FieldKey, string>
  );

  const fieldsForActiveCategory = computed(() => {
    if (activeCategory.value === 'custom') {
      // 对于自定义类别，返回所有自定义字段
      return customFields.value.map((field) => ({
        label: field.label,
        key: field.name as FieldKey,
        category: 'custom' as Category
      }));
    }
    // 对于其他类别，返回预定义的字段
    return fieldConfigs.filter(
      (item) => item.category === activeCategory.value
    );
  });

  const columns = computed<DataTableColumns<MockRow>>(() =>
    selectedFields.value.map((key) => ({
      title: fieldLabelMap[key],
      key
    }))
  );
  const fileSize = ref<string>('');
  const getStringSize = (str: string) => {
    const encoder = new TextEncoder(); // 默认使用 UTF-8 编码
    const bytes = encoder.encode(str);
    return bytes.length;
  };
  const jsonPreview = computed(() => {
    if (data.value.length) {
      let json = JSON.stringify(data.value, null, 2);
      fileSize.value = filesize(getStringSize(json), { standard: 'jedec' });
      return json;
    }
    return '';
  });
  const sqlPreview = computed(() => {
    if (data.value.length) {
      const result = jsonToSQL(data.value, 'mock-data');
      let sql = `-- 建表语句:\n${result.createTable}\n-- 插入语句:\n${result.inserts.map((insert: string) => insert).join('\n')}`;
      fileSize.value = filesize(getStringSize(sql), { standard: 'jedec' });
      return sql;
    }
    return '';
  });
  const toonPreview = computed(() => {
    if (data.value.length) {
      const toon = toonEncode(data.value);
      fileSize.value = filesize(getStringSize(toon), { standard: 'jedec' });
      return toon;
    }
    return '';
  });

  const handleQuickTemplate = (
    type: 'user' | 'employee' | 'product' | 'order' | 'api'
  ) => {
    if (type === 'user') {
      activeCategory.value = 'personal';
      selectedFields.value = ['name', 'email', 'phone', 'gender', 'age'];
    } else if (type === 'employee') {
      activeCategory.value = 'business';
      selectedFields.value = [
        'name',
        'company',
        'position',
        'department',
        'hireDate'
      ];
    } else if (type === 'product') {
      activeCategory.value = 'business';
      selectedFields.value = [
        'productName',
        'price',
        'productCategory',
        'stock'
      ];
    } else if (type === 'order') {
      activeCategory.value = 'business';
      selectedFields.value = ['productName', 'price', 'stock'];
    } else if (type === 'api') {
      activeCategory.value = 'tech';
      selectedFields.value = [
        'ip',
        'url',
        'method',
        'statusCode',
        'responseTime'
      ];
    }
  };

  const handleSelectAll = () => {
    selectedFields.value = fieldsForActiveCategory.value.map(
      (item) => item.key
    );
  };

  const handleClear = () => {
    selectedFields.value = [];
    data.value = [];
  };

  // 添加自定义字段
  const addCustomField = (field: Omit<CustomField, 'id'>) => {
    const newField: CustomField = {
      ...field,
      id: Date.now().toString()
    };
    customFields.value.push(newField);

    // 将自定义字段添加到fieldConfigs中
    fieldConfigs.push({
      label: field.label,
      key: field.name as FieldKey,
      category: 'custom'
    });

    // 将自定义字段的生成规则添加到fieldMockMap中
    fieldMockMap[field.name as FieldKey] = field.rule;

    // 更新fieldLabelMap
    fieldLabelMap[field.name as FieldKey] = field.label;
  };

  // 删除自定义字段
  const removeCustomField = (id: string) => {
    const index = customFields.value.findIndex((field) => field.id === id);
    if (index !== -1) {
      const field = customFields.value[index];
      customFields.value.splice(index, 1);

      // 从fieldConfigs中移除
      const configIndex = fieldConfigs.findIndex(
        (config) => config.key === field.name
      );
      if (configIndex !== -1) {
        fieldConfigs.splice(configIndex, 1);
      }

      // 从fieldMockMap中移除
      delete fieldMockMap[field.name as FieldKey];

      // 从fieldLabelMap中移除
      delete fieldLabelMap[field.name as FieldKey];

      // 从选中的字段中移除
      const selectedIndex = selectedFields.value.indexOf(
        field.name as FieldKey
      );
      if (selectedIndex !== -1) {
        selectedFields.value.splice(selectedIndex, 1);
      }
    }
  };

  // 更新自定义字段
  const updateCustomField = (id: string, field: Partial<CustomField>) => {
    const index = customFields.value.findIndex((f) => f.id === id);
    if (index !== -1) {
      const oldField = customFields.value[index];
      const updatedField = { ...oldField, ...field };
      customFields.value[index] = updatedField;

      // 如果字段名发生变化，需要更新相关映射
      if (field.name && field.name !== oldField.name) {
        // 更新fieldConfigs
        const configIndex = fieldConfigs.findIndex(
          (config) => config.key === oldField.name
        );
        if (configIndex !== -1) {
          fieldConfigs[configIndex].key = field.name as FieldKey;
          fieldConfigs[configIndex].label = field.label || oldField.label;
        }

        // 更新fieldMockMap
        fieldMockMap[field.name as FieldKey] = oldField.rule;
        delete fieldMockMap[oldField.name as FieldKey];

        // 更新fieldLabelMap
        fieldLabelMap[field.name as FieldKey] = field.label || oldField.label;
        delete fieldLabelMap[oldField.name as FieldKey];

        // 更新选中的字段
        const selectedIndex = selectedFields.value.indexOf(
          oldField.name as FieldKey
        );
        if (selectedIndex !== -1) {
          selectedFields.value[selectedIndex] = field.name as FieldKey;
        }
      } else if (field.label && field.label !== oldField.label) {
        // 只更新标签
        const configIndex = fieldConfigs.findIndex(
          (config) => config.key === oldField.name
        );
        if (configIndex !== -1) {
          fieldConfigs[configIndex].label = field.label;
        }
        fieldLabelMap[oldField.name as FieldKey] = field.label;
      }

      // 如果规则发生变化，更新fieldMockMap
      if (field.rule && field.rule !== oldField.rule) {
        fieldMockMap[oldField.name as FieldKey] = field.rule;
      }
    }
  };

  // 获取自定义字段的Mock规则
  const getCustomFieldRule = (type: CustomField['type']) => {
    switch (type) {
      case 'string':
        return '@word(3, 10)';
      case 'number':
        return '@integer(1, 100)';
      case 'boolean':
        return '@boolean';
      case 'date':
        return '@date';
      default:
        return '@word(3, 10)';
    }
  };

  // 编辑自定义字段
  const editCustomField = (field: CustomField) => {
    editingCustomField.value = field;
    newCustomField.value = {
      name: field.name,
      label: field.label,
      type: field.type,
      rule: field.rule
    };
    showAddCustomFieldModal.value = true;
  };

  // 保存自定义字段
  const saveCustomField = () => {
    if (!newCustomField.value.name || !newCustomField.value.label) {
      message.warning('字段名和标签不能为空');
      return;
    }

    if (editingCustomField.value) {
      // 更新现有字段
      updateCustomField(editingCustomField.value.id, newCustomField.value);
    } else {
      // 添加新字段
      addCustomField(newCustomField.value);
    }

    // 重置表单
    resetCustomFieldForm();
  };

  // 重置自定义字段表单
  const resetCustomFieldForm = () => {
    newCustomField.value = {
      name: '',
      label: '',
      type: 'string',
      rule: '@word(3, 10)'
    };
    editingCustomField.value = null;
    showAddCustomFieldModal.value = false;
  };

  // 处理字段类型变化
  const handleFieldTypeChange = (type: CustomField['type']) => {
    newCustomField.value.type = type;
    newCustomField.value.rule = getCustomFieldRule(type);
  };

  const handleGenerate = () => {
    if (!selectedFields.value.length) {
      message.warning('请先选择要生成的数据字段');
      return;
    }
    loading.value = true;
    try {
      const size = count.value && count.value > 0 ? count.value : 10;

      const baseRow: MockRow = {};
      selectedFields.value.forEach((key) => {
        (baseRow as any)[key] = fieldMockMap[key];
      });

      const result: { list: MockRow[] } = Mock.mock({
        [`list|${size}`]: [baseRow]
      });

      data.value = result.list;
    } finally {
      loading.value = false;
    }
  };

  const handleCopy = async () => {
    let outputData: string = '';
    if (outputFormat.value === 'sql') {
      outputData = sqlPreview.value;
    } else if (outputFormat.value === 'json') {
      outputData = jsonPreview.value;
    } else if (outputFormat.value === 'csv') {
      outputData = jsonPreview.value;
    }
    if (!outputData) {
      message.warning('暂无可复制的数据');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputData);
      message.success('复制成功');
    } catch (e) {
      console.error(e);
      message.error('复制失败，请手动选择文本复制');
    }
  };

  const handleDownload = () => {
    let outputData: string = '';
    if (outputFormat.value === 'sql') {
      outputData = sqlPreview.value;
    } else if (outputFormat.value === 'json') {
      outputData = jsonPreview.value;
    } else if (outputFormat.value === 'csv') {
      outputData = jsonPreview.value;
    } else if (outputFormat.value === 'toon') {
      outputData = toonPreview.value;
    }
    if (!outputData) {
      message.warning('暂无可下载的数据');
      return;
    }
    try {
      // 不同的格式要走不同的下载逻辑
      if (outputFormat.value === 'csv') {
        if (tableRef.value) {
          tableRef.value.downloadCsv({ fileName: 'mock-data' });
          message.success('开始下载');
        } else {
          message.error('下载异常');
        }
        return;
      }
      const fileName = `mock-data.${extMap[outputFormat.value]}`;

      useDownloadFile({
        source: outputData,
        fileName,
        extension: outputFormat.value
      });
      message.success('开始下载');
    } catch (e) {
      console.error(e);
      message.error('下载失败');
    }
  };
</script>

<template>
  <div class="w-[360px] flex-shrink-0 flex flex-col gap-4">
    <n-card class="mb-4" title="快速模板">
      <div class="flex flex-wrap gap-2 mb-3">
        <n-button size="small" @click="handleQuickTemplate('user')">
          用户信息
        </n-button>
        <n-button size="small" @click="handleQuickTemplate('employee')">
          员工信息
        </n-button>
        <n-button size="small" @click="handleQuickTemplate('product')">
          商品信息
        </n-button>
        <n-button size="small" @click="handleQuickTemplate('order')">
          订单信息
        </n-button>
        <n-button size="small" @click="handleQuickTemplate('api')">
          API测试数据
        </n-button>
      </div>
      <div class="flex gap-2">
        <n-button
          type="primary"
          size="small"
          :loading="loading"
          @click="handleGenerate"
        >
          生成数据
        </n-button>
        <n-button size="small" @click="handleSelectAll"> 全选</n-button>
        <n-button size="small" @click="handleClear"> 清空</n-button>
      </div>
    </n-card>

    <n-card class="mb-4" title="选择数据类型">
      <n-tabs type="segment" v-model:value="activeCategory">
        <n-tab name="personal">个人信息</n-tab>
        <n-tab name="business">商业数据</n-tab>
        <n-tab name="tech">技术数据</n-tab>
        <n-tab name="custom">自定义数据</n-tab>
      </n-tabs>
    </n-card>

    <n-card title="字段配置">
      <div class="mb-3">
        <n-checkbox-group v-model:value="selectedFields">
          <n-space item-style="display: flex; align-items: center" wrap>
            <n-checkbox
              v-for="field in fieldsForActiveCategory"
              :key="field.key"
              :value="field.key"
            >
              {{ field.label }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </div>

      <div class="flex items-center mt-2">
        <span class="w-[72px] text-[13px] text-[var(--n-text-color)]"
          >生成数量：</span
        >
        <n-input-number
          v-model:value="count"
          :min="1"
          :max="1000"
          size="small"
          style="width: 180px"
        />
      </div>

      <div class="flex items-center mt-2">
        <span class="w-[72px] text-[13px] text-[var(--n-text-color)]"
          >输出格式：</span
        >
        <n-select
          v-model:value="outputFormat"
          size="small"
          style="width: 180px"
          :options="[
            { label: 'JSON', value: 'json' },
            { label: 'CSV', value: 'csv' },
            { label: 'SQL', value: 'sql' },
            { label: 'TOON', value: 'toon' }
          ]"
        />
      </div>

      <!-- 自定义字段配置 -->
      <div
        v-if="activeCategory === 'custom'"
        class="pt-4 mt-4 border-t border-gray-200"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium">自定义字段</span>
          <n-button size="small" @click="showAddCustomFieldModal = true">
            添加字段
          </n-button>
        </div>

        <div
          v-if="customFields.length === 0"
          class="py-4 text-sm text-center text-gray-500"
        >
          暂无自定义字段，点击上方按钮添加
        </div>

        <div v-else class="pr-2 space-y-2 overflow-y-auto max-h-60">
          <div
            v-for="field in customFields"
            :key="field.id"
            class="flex items-center justify-between p-2 rounded bg-gray-50"
          >
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium truncate">{{ field.label }}</div>
              <div class="text-xs text-gray-500 truncate">
                {{ field.name }} ({{ field.type }})
              </div>
            </div>
            <div class="flex flex-shrink-0 ml-2 space-x-1">
              <n-button
                text
                type="primary"
                size="small"
                @click="editCustomField(field)"
              >
                编辑
              </n-button>
              <n-button
                text
                type="error"
                size="small"
                @click="removeCustomField(field.id)"
              >
                删除
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加/编辑自定义字段模态框 -->
      <n-modal
        v-model:show="showAddCustomFieldModal"
        preset="card"
        style="width: 500px"
        title="自定义字段"
      >
        <n-form :model="newCustomField" label-placement="left" label-width="80">
          <n-form-item label="字段名">
            <n-input
              v-model:value="newCustomField.name"
              placeholder="请输入字段名，如: userName"
            />
          </n-form-item>
          <n-form-item label="标签">
            <n-input
              v-model:value="newCustomField.label"
              placeholder="请输入字段标签，如: 用户名"
            />
          </n-form-item>
          <n-form-item label="数据类型">
            <n-select
              v-model:value="newCustomField.type"
              @update:value="handleFieldTypeChange"
              :options="[
                { label: '字符串', value: 'string' },
                { label: '数字', value: 'number' },
                { label: '布尔值', value: 'boolean' },
                { label: '日期', value: 'date' }
              ]"
            />
          </n-form-item>
          <n-form-item label="生成规则">
            <n-input
              v-model:value="newCustomField.rule"
              placeholder="请输入Mock规则，如: @word(3, 10)"
            />
          </n-form-item>
        </n-form>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <n-button @click="resetCustomFieldForm">取消</n-button>
            <n-button type="primary" @click="saveCustomField">保存</n-button>
          </div>
        </template>
      </n-modal>
    </n-card>
  </div>

  <div class="flex-1">
    <n-card>
      <template #header>
        <div class="flex items-center justify-between">
          <span>数据结果</span>
          <div class="flex gap-2 items-center">
            <n-text class="text-sm">{{ fileSize }}</n-text>
            <n-button size="small" @click="handleCopy">复制结果</n-button>
            <n-button size="small" @click="handleDownload">下载文件</n-button>
          </div>
        </div>
      </template>

      <div class="min-h-[360px] max-h-[480px] overflow-auto">
        <n-empty
          v-if="!data.length"
          description="请选择数据字段并点击“生成数据”按钮"
        />
        <template v-else>
          <n-data-table
            ref="tableRef"
            v-if="outputFormat === 'csv'"
            :bordered="false"
            :columns="columns"
            :data="data"
            size="small"
          />
          <n-input
            placeholder=""
            v-else-if="outputFormat === 'sql'"
            type="textarea"
            :value="sqlPreview"
            autosize
            readonly
          >
          </n-input>
          <n-input
            placeholder=""
            v-else-if="outputFormat === 'toon'"
            type="textarea"
            :value="toonPreview"
            autosize
            readonly
          >
          </n-input>
          <n-input
            v-else
            placeholder=""
            type="textarea"
            :value="jsonPreview"
            autosize
            readonly
          />
        </template>
      </div>
    </n-card>
  </div>
</template>
