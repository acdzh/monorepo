import './responsive-iframe.css';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

// see: https://github.com/spencerwooo/onedrive-cf-index/blob/master/src/fileView.js#L30
export const PDFCore: React.FC<{
  src: string;
  width?: number;
  height?: number;
  needDownload?: boolean;
}> = ({ src, width = 16, height = 9, needDownload = false }) => {
  const [isLoading, setIsLoading] = useState(needDownload);
  const [loadingLabelText, setLoadingLabelText] = useState('Loading PDF...');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(
    needDownload ? null : src
  );

  useEffect(() => {
    if (!needDownload) {
      return;
    }
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          setLoadingLabelText(`😟 ${response.status} ${response.statusText}`);
          throw Error(response.status + ' ' + response.statusText);
        }
        if (!response.body) {
          setLoadingLabelText(
            '😟 ReadableStream not yet supported in this browser. Please download the PDF directly using the button below.'
          );
          throw Error('😟 ReadableStream not yet supported in this browser.');
        }

        const contentEncoding = response.headers.get('content-encoding');
        const contentLength = response.headers.get(
          contentEncoding ? 'x-file-size' : 'content-length'
        );
        if (contentLength === null) {
          setLoadingLabelText(
            '😟 Loading progress unavailable. Please wait or download the PDF directly using the button below.'
          );
          console.error('😟 Response size header unavailable');
          return response;
        }

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        return new Response(
          new ReadableStream({
            start(controller) {
              if (!response.body) return;
              const reader = response.body.getReader();

              read();
              function read() {
                reader
                  .read()
                  .then(({ done, value }) => {
                    if (done) {
                      controller.close();
                      return;
                    }
                    loaded += value.byteLength;
                    setLoadingProgress(loaded / total);
                    controller.enqueue(value);
                    read();
                  })
                  .catch((error) => {
                    console.error(error);
                    controller.error(error);
                  });
              }
            },
          })
        );
      })
      .then((resp) => resp.blob())
      .then((blob) => {
        const pdfFile = new Blob([blob], { type: 'application/pdf' });
        const pdfFileUrl = URL.createObjectURL(pdfFile);
        setFileUrl(pdfFileUrl);
        setIsLoading(false);
      })
      .catch(() => {
        setLoadingLabelText('😟 This pdf is unavailable.');
      });
  }, [needDownload, src]);

  return (
    <div className="w-full m-auto mb-1em">
      <div
        className={clsx(
          'px-24 text-center',
          'rounded-md light:shadow',
          'border dark:border-true-gray-700',
          {
            hidden: !isLoading,
          }
        )}
      >
        <FaSpinner className="animate-spin" />
        &nbsp;&nbsp;
        <span>{loadingLabelText}</span>
        {loadingProgress === 0 ? null : (
          <span>&nbsp;{Math.round(loadingProgress * 100)}%</span>
        )}
      </div>
      <div
        className={clsx('responsive-iframe-container', {
          hidden: isLoading,
        })}
        style={{
          paddingTop: `${(100 * height) / width}%`,
        }}
      >
        <iframe
          // className={clsx({
          //   hidden: isLoading,
          // })}
          src={fileUrl || undefined}
          allowFullScreen
          loading="lazy"
          title={src}
        ></iframe>
      </div>
      <div className="text-center text-10px mt-8px">
        跳转 PDF 文件
        <a className="text-theme" href={src} target="_blank" rel="noreferrer">
          原始地址
        </a>
        .
      </div>
    </div>
  );
};

export const PDFWrapper: React.FC<{
  src?: string;
  href?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  needDownload?: boolean;
}> = ({
  src = null,
  href = null,
  children = null,
  width = 16,
  height = 9,
  needDownload = false,
}) => {
  const [srcList] = useState<
    {
      src: string;
      needDownload: boolean;
    }[]
  >(
    (() => {
      const list = [];
      if (src) {
        list.push({
          src,
          needDownload,
        });
      } else if (href) {
        list.push({
          src: href,
          needDownload,
        });
      }
      if (children) {
        (Array.isArray(children) ? children : [children])
          .filter(
            (node) => node?.props?.originalType === 'a' && node?.props?.href
          )
          .forEach((node) => {
            list.push({
              src: node.props.href,
              needDownload,
            });
          });
      }
      return list;
    })()
  );
  return (
    <>
      {srcList.map((s) => (
        <PDFCore
          key={s.src}
          src={s.src}
          width={width}
          height={height}
          needDownload={s.needDownload}
        />
      ))}
    </>
  );
};

export const pdf = PDFWrapper;
