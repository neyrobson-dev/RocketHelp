import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';

export function Home() {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    // {
    //   id: '123',
    //   patrimony: '123456',
    //   when: '18/07/2022 às 10:00',
    //   status: 'open'
    // }
  ]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full" 
        justifyContent="space-between"
        alignItems="center"
        background="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]}/>}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center" >
          <Heading color="gray.100">
            Meus chamados
          </Heading>
          <Text color="gray.200">
            3
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title='Em andamento'
            type="open"
            onPress={() => setStatusSelected('open')} 
            isActive={statusSelected === 'open'}
          />
          <Filter
            title='Finalizados'
            type="closed"
            onPress={() => setStatusSelected('closed')}  
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => <Order data={item} />}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color={colors.gray[300]} fontSize="md" mt={6} textAlign="center" >
                Voçê ainda não possui {'\n'}
                solicitações { statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title='Nova solicitação' />
      </VStack>
    </VStack>
  );
}
