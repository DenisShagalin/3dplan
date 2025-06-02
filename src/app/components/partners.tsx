import { Flex } from 'antd';

export const Partners = () => {
  return (
    <Flex className='home_partners' justify='center' align='center'>
      <img
        src="/partners/bremo.png"
        alt='partner'
        style={{
          width: '9%',
          height: '100%',
        }}
      />
      <img
        src="/partners/engel.png"
        alt='partner'
        style={{
          width: '20%',
          height: '100%',
        }}
      />
      <img
        src="/partners/remax.png"
        alt='partner'
        style={{
          width: '20%',
          height: '100%',
        }}
      />
      <img
        src="/partners/immobilien.jpeg"
        alt='partner'
        style={{
          width: '20%',
          height: '100%',
        }}
      />
    </Flex>
  )
};
