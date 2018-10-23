import * as chai from "chai";
import Accumulator from "../src/index";

describe('Tests', () => {

    const {expect} = chai;


    describe('#subscribe', () => {
        it('1', (done) => {
            const accumulator: Accumulator<{ text: string }> = new Accumulator<{ text: string }>();
            accumulator.setOptions({count: 1});
            accumulator.subscribe((objects: Array<{ text: string }>) => {
                done();
            });
            accumulator.add({text: 'test'});
        });

        it('2', (done) => {
            const accumulator: Accumulator<{ text: string }> = new Accumulator<{ text: string }>();
            accumulator.setOptions({count: 2});
            accumulator.subscribe((objects: Array<{ text: string }>) => {
                expect(objects).to.have.lengthOf(2);
                done();
            });
            accumulator.add({text: 'test'});
            accumulator.add({text: 'test'});
        });

        it('3', (done) => {
            const accumulator: Accumulator<{ text: string }> = new Accumulator<{ text: string }>();
            accumulator.setOptions({count: 2, time: 100});
            accumulator.subscribe((objects: Array<{ text: string }>) => {
                expect(objects).to.have.lengthOf(1);
                done();
            });
            accumulator.add({text: 'test'});
        });

    });

    describe('#add', () => {
        it('1', () => {
            const accumulator: Accumulator<{ text: string }> = new Accumulator<{ text: string }>();
            accumulator.setOptions({count: 3});
            expect(accumulator.add({text: 'test'})).to.deep.equal({count: 1});
            expect(accumulator.add({text: 'test'})).to.deep.equal({count: 2});
            expect(accumulator.add({text: 'test'})).to.deep.equal({count: 0});
            expect(accumulator.add({text: 'test'})).to.deep.equal({count: 1});
            expect(accumulator.add({text: 'test'})).to.deep.equal({count: 2});
        });
    });


});