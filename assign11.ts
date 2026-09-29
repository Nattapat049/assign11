abstract class TravelPackage {
    private packageId: string;
    private packageName: string;
    protected basePrice: number;

    constructor(packageId: string, packageName: string, basePrice: number) {
        this.packageId = packageId;
        this.packageName = packageName;
        this.basePrice = basePrice;
    }

    public getPackageId(): string {
        return this.packageId;
    }

    public getPackageName(): string {
        return this.packageName;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }
    public abstract calculatePrice(people: number): number;
}

class OneDayTrip extends TravelPackage {
    constructor(packageId: string, packageName: string, basePrice: number) {
        super(packageId, packageName, basePrice);
    }

    public calculatePrice(people: number): number {
        let total = this.basePrice * people;
        if (people >= 5) {
            total = total * 0.90; 
        }
        return total;
    }
}
class OvernightTrip extends TravelPackage {
    private numberOfNights: number;

    constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
        super(packageId, packageName, basePrice);
        this.numberOfNights = numberOfNights;
    }

    public getNumberOfNights(): number {
        this.numberOfNights;
        return this.numberOfNights;
    }

    public calculatePrice(people: number): number {
        let total = this.basePrice * people * this.numberOfNights;
        if (people >= 3) {
            total = total * 0.85;
        }
        return total;
    }
}

class Customer {
    private customerId: string;
    private name: string;
    private phone: string;

    constructor(customerId: string, name: string, phone: string) {
        this.customerId = customerId;
        this.name = name;
        this.phone = phone;
    }

    public getName(): string {
        return this.name;
    }

    public getCustomerId(): string {
        return this.customerId;
    }

    public getPhone(): string {
        return this.phone;
    }
}
class Traveler {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }
}

class Booking {
    private bookingId: string;
    private customer: Customer;
    private travelPackage: TravelPackage;
    private travelers: Traveler[];

    constructor(bookingId: string, customer: Customer, travelPackage: TravelPackage, travelers: Traveler[]) {
        this.bookingId = bookingId;
        this.customer = customer;
        this.travelPackage = travelPackage;
        this.travelers = travelers;
    }

    public getBookingId(): string {
        return this.bookingId;
    }

    public getCustomer(): Customer {
        return this.customer;
    }

    public getTravelPackage(): TravelPackage {
        return this.travelPackage;
    }

    public getTravelers(): Traveler[] {
        return this.travelers;
    }

    public getTotalPrice(): number {
        return this.travelPackage.calculatePrice(this.travelers.length);
    }
}
class TravelAgency {
    private agencyName: string;
    private packages: TravelPackage[] = [];

    constructor(agencyName: string) {
        this.agencyName = agencyName;
    }

    public addPackage(pkg: TravelPackage): void {
        this.packages.push(pkg);
    }

    public showAllPackages(): void {
        console.log(`===== Travel Packages offered by ${this.agencyName} =====`);
        this.packages.forEach((pkg, index) => {
            console.log(`${index + 1}. Package ID: ${pkg.getPackageId()}, Name: ${pkg.getPackageName()}, Base Price: ${pkg.getBasePrice()} Baht`);
        });
        console.log("");
    }
}
const agency = new TravelAgency("Sunset Travel");

const pkg1 = new OneDayTrip("P001", "Bangkok City Tour (One-Day)", 1500);
const pkg2 = new OvernightTrip("P002", "Chiang Mai Trip (Overnight - 3 Nights)", 2500, 3);

agency.addPackage(pkg1);
agency.addPackage(pkg2);

agency.showAllPackages();

console.log("===== Polymorphism Output =====");
console.log(`1. ${pkg1.getPackageName()}`);
console.log(`Price: ${pkg1.calculatePrice(5).toLocaleString()} Baht (ลด 10% เมื่อจอง 5 คนขึ้นไป)`);
console.log(`2. ${pkg2.getPackageName()}`);
console.log(`Price: ${pkg2.calculatePrice(5).toLocaleString()} Baht (ลด 15% เมื่อจอง 3 คนขึ้นไป)\n`);

const customer1 = new Customer("C001", "Alice", "0812345678");

const travelersList: Traveler[] = [
    new Traveler("Alice", 30),
    new Traveler("Bob", 28),
    new Traveler("Charlie", 35),
    new Traveler("David", 32),
    new Traveler("Eve", 27)
];
const booking1 = new Booking("B001", customer1, pkg1, travelersList);

console.log("===== Booking Detail =====");
console.log(`Booking ID: ${booking1.getBookingId()}`);
console.log(`Customer: ${booking1.getCustomer().getName()}`);
console.log(`Package: ${booking1.getTravelPackage().getPackageName()}`);
const travelerNames = booking1.getTravelers().map(t => t.getName()).join(", ");
console.log(`Travelers: ${booking1.getTravelers().length} (${travelerNames})`);
console.log(`Total Price (10% Disc): ${booking1.getTotalPrice().toLocaleString()} Baht`);