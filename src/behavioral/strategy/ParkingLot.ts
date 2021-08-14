export default class ParkingLot {
    tickets: { plate: string, checkinDate: Date} [];
    location: string;
    constructor(location: string) {
        this.tickets = [];
        this.location = location;
    }

    checkin(plate: string, checkinDate: Date){
        this.tickets.push({plate, checkinDate});
    }

    checkout(plate: string, checkoutDate: Date) {
        const ticket = this.tickets.find(ticket => ticket.plate === plate);
        if (!ticket) throw new Error("Ticket not found");

        const period = (checkoutDate.getTime() - ticket.checkinDate.getTime()) / (1000*60*60);
        let amount = 0;
        if (this.location === "beach") {
            amount = period * 5
        }
        
        if (this.location === "airport") {
            amount = 10;
            const remainingHours = period - 3;
            if (remainingHours > 0) amount += remainingHours * 3;
        }

        if (this.location === "shopping") {
            amount = 0;
        }
        return {
            amount
        }
    }
}