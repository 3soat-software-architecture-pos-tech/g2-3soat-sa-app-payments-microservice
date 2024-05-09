import Sns from '../src/entities/Sns'; // Importe a classe Sns

describe('Sns', () => {
  test('deve retornar a mensagem correta', () => {
    const message = 'Body SNS';
    const sns = new Sns(message); // Crie uma instância da classe Sns
    expect(sns.getMessage()).toBe(message); // Verifique se a mensagem retornada é a mesma que foi passada para o construtor
  });
});
