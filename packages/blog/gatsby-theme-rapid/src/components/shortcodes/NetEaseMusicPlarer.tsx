import React from 'react';

export const NetEaseMusicPlayer: React.FC<{
  id: string;
  type?: 1 | 2 | 3;
  autoPlay?: boolean;
  showInfo?: boolean;
}> = ({ id, type = 2, autoPlay = false, showInfo = true }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '10px',
    }}
  >
    <iframe
      style={{
        width: '60%',
        height: '89px',
        minWidth: '240px',
        borderRadius: 'unset',
        boxShadow: 'unset',
        border: 'unset',
      }}
      marginWidth={0}
      marginHeight={0}
      src={`//music.163.com/outchain/player?type=${type}&id=${id}&auto=${
        autoPlay ? '1' : '0'
      }&height=66`}
      title="网易云音乐"
    ></iframe>
    {showInfo && (
      <div style={{ fontSize: '10px', color: ' var(--TextThird)' }}>
        如因版权问题无法加载, 请跳转至
        <a href={`https://music.163.com/song?id=${id}`}>网易云</a>播放.
      </div>
    )}
  </div>
);
