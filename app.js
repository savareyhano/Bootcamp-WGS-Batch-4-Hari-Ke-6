const fs = require('fs');
const readline = require('readline');
const { default: isAlpha } = require('validator/lib/isAlpha');
const { default: isEmail } = require('validator/lib/isEmail');
const { default: isMobilePhone } = require('validator/lib/isMobilePhone');

// Membuat folder data apabila tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (questions) => {
    return new Promise((resolve, reject) => {
        rl.question(questions, (answer) => {
            resolve(answer)
        })
    })
}

const main = async () => {
    var name = await question('What is your name? ');
    // Jika format nama sesuai maka akan lanjut ke pertanyaan selanjutnya 
    // Jika format nama tidak sesuai akan menampilkan pesan dan close
    if (isAlpha(name, 'en-US', { ignore: ' ' })) {
        var email = await question('What is your email? ');
        // Jika format email sesuai maka akan lanjut ke pertanyaan selanjutnya 
        // Jika format email tidak sesuai akan menampilkan pesan dan close
        if (isEmail(email)) {
            var phone = await question('What is your phone number? ');
            // Jika format no hp sesuai sesuai maka akan menyimpan input ke dalam file contacts.json di folder data
            // Jika format no hp tidak sesuai akan menampilkan pesan dan close
            if (isMobilePhone(phone, 'id-ID')) {
                const contact = { name, email, phone };
                const file = fs.readFileSync('data/contacts.json', 'utf-8');
                const contacts = JSON.parse(file);
                contacts.push(contact);
                fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
                console.log('Terimakasih sudah memasukkan data!');
                rl.close();
            } else {
                console.log(`'${phone}'`, 'is wrong format for indonesian phone number!');
                rl.close();
            }
        } else {
            console.log(`'${email}'`, 'is wrong format for email!');
            rl.close();
        }
    } else {
        console.log(`'${name}'`, 'is wrong format for name!');
        rl.close();
    }
}

main()