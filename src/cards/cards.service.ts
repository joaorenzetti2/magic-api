import { Injectable, Logger } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { InjectModel } from "@nestjs/mongoose";
import { Model, set } from "mongoose";
import { Card } from "src/cards/interface/cards.schema";
import { firstValueFrom } from "rxjs";
import * as fs from 'fs';


@Injectable()
export class CardService {
    private readonly logger = new Logger(CardService.name);

    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Card.name) private cardModel: Model<Card>,
    ) {}

    async create(userId: string, createCardDto: any): Promise<Card> {
        const createdCard = new this.cardModel({
            ...createCardDto, 
            userId,
        });
        return createdCard.save();
    }

    async getCommanderDeck() {
        try {
            this.logger.log('Buscando commander...');
            const commanderUrl = 'https://api.magicthegathering.io/v1/cards?name=henzie';
            const commanderResponse = await firstValueFrom(this.httpService.get(commanderUrl));
            const commanderData = commanderResponse.data.cards[0];

            this.logger.log(`Commander encontrado: ${commanderData.name}`);
            const colors = commanderData.colors;
            const colorQuery = colors.map(color => `colorIdentity=${color}`).join('&');

            this.logger.log(`Buscando deck...`);
            const deckUrl = `https://api.magicthegathering.io/v1/cards?${colorQuery}&pageSize=99`;
            const deckResponse = await firstValueFrom(this.httpService.get(deckUrl));
            const deckCards = deckResponse.data.cards;

            const deck = {
                commander: {
                    name: commanderData.name,
                    manaCost: commanderData.manaCost,
                    type: commanderData.type,
                    rarity: commanderData.rarity,
                    text: commanderData.text,
                    power: commanderData.power,
                    toughness: commanderData.toughness,
                  },

                cards: deckCards.map(card => ({
                    name: card.name,
                    manaCost: card.manaCost,
                    type: card.type,
                    rarity: card.rarity,
                    text: card.text,
                    power: card.power,
                    toughness: card.toughness,
                })),
            };

                fs.writeFileSync('deck.json', JSON.stringify(deck, null, 2));

                const createdCommander = new this.cardModel(deck.commander);
                await createdCommander.save();

                const createdDeck = await this.cardModel.insertMany(deck.cards);

                this.logger.log('Commander e deck salvos no banco');
                return {
                    commander: createdCommander,
                    deck: createdDeck,
                };
        } catch (error) {
            this.logger.error('Error fetching commander or deck', error);
            throw error;
        }
    }

    async createDeck(userId: String, createDeckDto: any) {
        const createdDeck = new this.cardModel({
            ...createDeckDto,
            userId: userId
        });
        return createdDeck.save();
    }

    async updateDeck(userId: String, deckId: String, updateDeckDto: any) {
        return this.cardModel.findOneAndUpdate(
            { _id: deckId },
            { userId: userId },
            { $set: updateDeckDto },
        );
    }

    async deleteDeck(userId: String, deckId: String) {
        return this.cardModel.findOneAndDelete({ _id: deckId}, {userId: userId });
    }
}