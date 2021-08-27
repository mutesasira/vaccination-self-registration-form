import { PDFViewer } from '@react-pdf/renderer';
import { useStore } from 'effector-react';
import { $store } from '../Store';
import { Registration } from './Registration';

export const PDFForm = () => {
  const store = useStore($store)
  return <div style={{ width: '100vw', height: "89vh" }}>
    <PDFViewer width="100%" height="100%">
      <Registration {...store} />
    </PDFViewer>
  </div>
};
