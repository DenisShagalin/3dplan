import { Flex } from 'antd';
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import Text from 'antd/lib/typography/Text';

export const MainPlans = () => {
  const t = useTranslations();

  return (
    <Flex className='home_plans' justify='space-around'>
      <Link href='/service/2d-dimension'>
        <Flex vertical className='img_wrap' align='center'>
          <Image
            src="/plans/A4_R.jpg"
            alt="R"
            width={1000}
            height={0}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Text className='dark_link'>{t('control.learnMore')}</Text>
        </Flex>
      </Link>
      <Link href='/service/2d-furniture'>
        <Flex vertical className='img_wrap' align='center'>
          <Image
            src="/plans/A4-M.jpg"
            alt="M"
            width={1000}
            height={0}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Text className='dark_link'>{t('control.learnMore')}</Text>
        </Flex>
      </Link>
      <Link href='/service/3d-furniture'>
        <Flex vertical className='img_wrap' align='center'>
          <Image
            src="/plans/A4-3D.jpg"
            alt="3D"
            width={1000}
            height={0}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <Text className='dark_link'>{t('control.learnMore')}</Text>
        </Flex>
      </Link>
    </Flex>
  )
};
