export class AppService {
  private pets: Array<Pets> = [
    {
      family: 'Dog',
      name: 'Spike',
      price: 12.3
    },
    {
      family: 'Cat',
      name: 'Tom',
      price: 1.2,
    }
  ];

  getPetCount(): number {
    return this.pets.length;
  }

  getPets(): Array<Pets>{
    return this.pets;
  }
}
