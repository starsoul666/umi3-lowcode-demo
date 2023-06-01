import React, { useState, useRef } from 'react';
import { Button, Row, Col, Modal } from 'antd';
import { config } from '@alilc/lowcode-engine';
import Preview from '@/components/FormDesigner/preview';
import { getProjectSchemaFromLocalStorage } from '@/components/FormDesigner/services/mockService';

function AddModal() {
  const [modalState, setModalState] = useState({
    open: false,
    schema: {},
  });

  const formRef = useRef();

  const handleOk = async () => {
    console.log(formRef.current);
    const values = await formRef.current?.validateFields();
    console.log(values);
  };

  return (
    <div>
      <Row>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              const scenarioName = 'basic-antd';
              const projectSchema =
                getProjectSchemaFromLocalStorage(scenarioName);
              const { componentsTree } = projectSchema;
              const schema = componentsTree[0];
              setModalState({
                open: true,
                schema,
              });
            }}
          >
            新增
          </Button>
        </Col>
      </Row>
      <Modal
        title="预览"
        open={modalState.open}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <Preview schema={modalState.schema} formRef={formRef} />
      </Modal>
    </div>
  );
}

export default AddModal;
