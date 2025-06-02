import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

export const PriceMini = ({
  price,
  highlight,
  rooms,
}: any) => {
  const t = useTranslations();
  return (
    <Flex
      vertical
      className='price_mini'
      align='center'
      style={{
        backgroundColor: highlight ? 'var(--main-green-color)' : 'var(--main-white-color)'
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