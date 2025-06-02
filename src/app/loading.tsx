import { Flex, Spin } from 'antd';

export default function Loading() {
	return (
		<Flex align="center" gap="middle" justify="center">
			<Spin size="large" />
		</Flex>
	)
}