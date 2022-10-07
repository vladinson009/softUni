function foreignLanguages(country) {
    /**
     English is spoken in England and USA;
     Spanish is spoken in Spain, Argentina, and Mexico;
     For the others, we should print "unknown";
     */

    if (country == 'England' || country == 'USA') {
        console.log('English');
    } else if (country == 'Spain' || country == 'Argentina' ||
        country == 'Mexico') {
        console.log('Spanish');
    } else {
        console.log('unknown');
    }
}

foreignLanguages('USA');