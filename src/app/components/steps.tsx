import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

const Step = ({ step }: { step: number }) => <div style={{
  width: '60px',
  minWidth: '60px',
  maxWidth: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'var(--main-green-color)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '15px',
  fontSize: '20px'
}}>
  {step}
</div>;

const StepWrap = ({ children }: any) => <div style={{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '350px',
}}>{children}</div>

export const Steps = ({
  title,
  steps,
}: {
  title: string,
  steps: string[],
}) => {
  const t = useTranslations();

  return (
    <Flex
      vertical
      className='small_padding unset_wdith'
      align='center'
      style={{
        width: '100%',
        backgroundColor: 'var(--main-white-color)',
        marginBottom: '50px',
      }}
    >
      <Title
        style={{
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          color: 'var(--main-grey-color)'
        }}
        level={2}
      >
        {t(title).toUpperCase()}
      </Title>

      <Flex
        className='steps_wrapper'
        align='flex-start'
        justify='space-around'
        gap='small'
        wrap
      >
        {steps.map((step, idx) => (
          <StepWrap key={idx}>
            <Step step={idx + 1} />
            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                color: 'var(--main-grey-color)',
                fontSize: '16px'
              }}
            >
              {t(step)}
            </Paragraph>
          </StepWrap>
        ))}
      </Flex>
    </Flex>
  )
}