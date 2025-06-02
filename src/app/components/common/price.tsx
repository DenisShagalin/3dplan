import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

export const Price = ({
  price,
  highlight,
  rooms,
}: any) => {
  const t = useTranslations();
  return (
    <Flex
      vertical
      className='price'
      align='center'
      style={{
        backgroundColor: highlight ? 'var(--main-green-color)' : undefined
      }}
    >
      <div>
        <span>{price}</span>
        <span>{t('price.currency')}</span>
      </div>
      <span>{t('price.floor')}</span>
      <span>{t(rooms)}</span>
    </Flex>
  )
};