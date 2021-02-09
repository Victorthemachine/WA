
module.exports = class Util {
    formatHeaderText() {
        /* I left this here for educational purposes. Children and aspiring programmers if you see this kind of implementation, I recommend you run and run far.
        
                let pozdrav = "Dobré ráno!";
                let cas = new Date().getHours();
                switch (cas) {
                    case 0:
                    case 1:
                    case 2:
                        pozdrav = "Dobrou noc!";
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        pozdrav = "Dobré ráno!";
                        break;
                    case 9:
                    case 10:
                    case 11:
                        pozdrav = "Dobré dopoledne!";
                        break;
                    case 12:
                        pozdrav = "Dobré poledne a dobrou chuť, pokud právě obědváte!";
                        break;
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                        pozdrav = "Dobré odpoledne!";
                        break;
                    case 17:
                    case 18:
                    case 19:
                        pozdrav = "Dobrý podvečer!";
                        break;
                    case 20:
                    case 21:
                    case 22:
                        pozdrav = "Dobrý večer!";
                        break;
                    case 23:
                        pozdrav = "Dobrou noc!";
                        break;
                    default:
                        pozdrav = "Dobrý den!";
                } */
        const currHours = new Date().getHours();
        console.log(`Hours: ${currHours}`)
        let annoucement = '';
        if (currHours < 3) {
            annoucement = 'Moskau, Moskau';
        } else if (currHours < 9) {
            annoucement = 'Wirf die Gläser an die Wand';
        } else if (currHours < 12) {
            annoucement = 'Russland ist ein schönes Land';
        } else if (currHours === 12) {
            annoucement = 'Ho ho ho ho ho, hey';
        } else if (currHours < 17) {
            annoucement = 'Moskau, Moskau';
        } else if (currHours < 19) {
            annoucement = 'Deine Seele ist so groß';
        } else if (currHours < 23) {
            annoucement = 'Nachts da ist der Teufel los';
        } else {
            annoucement = 'Ha ha ha ha ha, hey';
        }
        return annoucement;
    }
} 