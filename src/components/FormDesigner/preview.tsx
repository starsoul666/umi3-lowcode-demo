import React, { useState, useEffect, useRef } from 'react';
import {
  buildComponents,
  assetBundle,
  AssetLevel,
  AssetLoader,
} from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import { Spin } from 'antd';
import {
  getProjectSchemaFromLocalStorage,
  getPackagesFromLocalStorage,
} from './services/mockService';

const getScenarioName = function () {
  if (location.search) {
    return (
      new URLSearchParams(location.search.slice(1)).get('scenarioName') ||
      'index'
    );
  }
  return 'basic-antd';
};

const SamplePreview = (props: any) => {
  const { schema, formRef } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function init() {
    const scenarioName = getScenarioName();
    const packages = getPackagesFromLocalStorage(scenarioName);
    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
    const { componentsMap: componentsMapArray } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(
      buildComponents(libraryMap, componentsMap),
    );
    setLoading(false);
    setData({
      schema,
      components,
    });
  }

  const { components } = data;

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="lowcode-plugin-sample-preview">
      <Spin spinning={loading}>
        <ReactRenderer
          className="lowcode-plugin-sample-preview-content"
          schema={schema}
          components={components}
          onCompGetRef={(schema, ref) => {
            if (ref.props?.name === 'basicForm') {
              console.log('ref: ', ref);
              formRef.current = ref;
            }
          }}
          appHelper={{
            requestHandlersMap: {
              fetch: createFetchHandler(),
            },
          }}
        />
      </Spin>
    </div>
  );
};

export default SamplePreview;
