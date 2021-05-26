---
title: Seed iOS Simulator with Contacts for Testing
description: How to seed the iOS simulator with thousands of contacts to stress-test your hybrid app.
tags: [ios, simulator]
published: true
publishDate: 2015-05-08
previousUrl: https://blog.benjamincharity.com/seed-ios-simulator-with-contacts-for-testing/
---

# Seed iOS Simulator with Contacts for Testing

Recently I was tasked with building a custom contacts display/picker for iOS using JavaScript. I needed a way to test my code against a large contacts base to ensure good performance. Unfortunately there didn't seem to be any easy solution.

Of the solutions I found, only one actually worked but it was limited to 200 contacts which didn't put enough stress on my code. If all you need is 200, you can find it here: [DummyContacts][dummy].

I came across an article by [Adam Harris][adam] who had devised a [clever way][20000] to build a VCard with 20,000 contacts. He even offers that VCard for download. Unfortunately, importing 20,000 contacts locked up my simulator.

Below I have outlined how I created a 2000 contact VCard for import (heavily based off of Adam's work). Full Plunkr can be found [here][plunkr].

> A full list of resources along with downloadable VCards containing various amounts of contacts will be available for download at the end of this article.

## Generate a JSON array full of contacts

Luckily there is a great online tool for generating objects with random data called [JSON Generator][json]. You can create an object template using a few custom tags to generate random names/numbers/etc.

Here is the [template][template] I used:

<script src="https://gist.github.com/benjamincharity/c295aea01a74b036fec0.js"></script>

I won't dive into the template here. If you are curious about the structure of the object, check out Adam's article (linked above). Also, the custom tags are well explained by the help section on the JSON Generator website.

The primary changes between Adam's template and my own is:

1. All phone numbers are 'fake' e.g. (638) 555-8374
2. All emails are 'fake' e.g. user@gmail9999.com
3. `n.families` & `n.givens` are strings rather than arrays

> Note: There seems to be a limit of about 100 that the generator will output in one run, so I had to run it several times to copy enough output.

This is what the template and results would look like:

![Generated example](https://blog.benjamincharity.com/content/images/2015/05/generatorExample.png)

## Convert the array into a VCard text file

An open source project called [VCard to JSON][vcard] will allow us to convert a contacts object into the VCard format.

**NOTE:** This library expects `n.families` and `n.givens` to contain arrays. However, at the time of this writing, the JSON Generator outputs the same name over and over again across all objects when inside an array. You can find a modified version of this library as part of the [full gist][fullgist] of this process.

**Note #2:** For some reason, the output always seems to have `undefined` at the beginning. I didn't have the time to debug it, so in the Plunkr, I am simply stripping out the first 9 characters of the string. Hacky, but it gets it done. If anyone takes the time to find a fix, I'll be more than happy to update the Plunkr and this article.

## Tie it all together

I created a [plunkr][plunkr] to tie everything together. Simply replace the contents of `contacts.js` with your array of contacts, click 'Create Link' which will create a text file containing all of the VCard formatted contacts, and finally click download to download the file.

## Import the contacts

Now we simply need to open the Contacts app in the simulator and drop the downloaded vcf file onto it. Depending on how many contacts you are importing, it may take a few minutes. (1000 was quite fast though)

- - -

##### Resources

- [Project Plunkr][plunkr]
- [Gist with all project files][fullgist]
- [JSON Generator template][template]
- [VCard to JSON library][vcard]
- [VCard with 1,000 contacts](http://cdn.benjamincharity.com/vcards/contacts0-1000.vcf)
- [VCard with 1,000 (different) contacts](http://cdn.benjamincharity.com/vcards/contacts1000-2000.vcf)
- [Zip of all VCards](http://cdn.benjamincharity.com/vcards/ContactsVCards.zip)

##### Batches of 100 contacts per VCard:

- [VCard 1-100](http://cdn.benjamincharity.com/vcards/contacts1-100.vcf)
- [VCard 101-200](http://cdn.benjamincharity.com/vcards/contacts101-200.vcf)
- [VCard 201-300](http://cdn.benjamincharity.com/vcards/contacts201-300.vcf)
- [VCard 301-400](http://cdn.benjamincharity.com/vcards/contacts301-400.vcf)
- [VCard 401-500](http://cdn.benjamincharity.com/vcards/contacts401-500.vcf)
- [VCard 501-600](http://cdn.benjamincharity.com/vcards/contacts501-600.vcf)
- [VCard 601-700](http://cdn.benjamincharity.com/vcards/contacts601-700.vcf)
- [VCard 701-800](http://cdn.benjamincharity.com/vcards/contacts701-800.vcf)
- [VCard 801-900](http://cdn.benjamincharity.com/vcards/contacts801-900.vcf)
- [VCard 901-1000](http://cdn.benjamincharity.com/vcards/contacts901-1000.vcf)
- [VCard 1001-1100](http://cdn.benjamincharity.com/vcards/contacts1001-1100.vcf)
- [VCard 1101-1200](http://cdn.benjamincharity.com/vcards/contacts1101-1200.vcf)
- [VCard 1201-1300](http://cdn.benjamincharity.com/vcards/contacts1201-1300.vcf)
- [VCard 1301-1400](http://cdn.benjamincharity.com/vcards/contacts1301-1400.vcf)
- [VCard 1401-1500](http://cdn.benjamincharity.com/vcards/contacts1401-1500.vcf)
- [VCard 1501-1600](http://cdn.benjamincharity.com/vcards/contacts1501-1600.vcf)
- [VCard 1601-1700](http://cdn.benjamincharity.com/vcards/contacts1601-1700.vcf)
- [VCard 1701-1800](http://cdn.benjamincharity.com/vcards/contacts1701-1800.vcf)
- [VCard 1801-1900](http://cdn.benjamincharity.com/vcards/contacts1801-1900.vcf)
- [VCard 1901-2000](http://cdn.benjamincharity.com/vcards/contacts1901-2000.vcf)




[plunkr]: http://plnkr.co/edit/0Q1gz3BLocaIFg2B0rVH?p=preview
[template]: https://gist.github.com/benjamincharity/c295aea01a74b036fec0
[fullgist]: https://gist.github.com/benjamincharity/ac35ac288552feee349a
[json]: https://next.json-generator.com/
[vcard]: https://github.com/andrewppace/vcard-json
[adam]: https://github.com/aharris88
[20000]: http://www.adamwadeharris.com/heres-how-i-created-20000-fake-contacts-on-the-iphone/
[dummy]: https://github.com/Janak-Nirmal/DummyContacts
