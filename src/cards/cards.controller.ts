import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Request, 
    Delete, 
    Param, 
    Body, 
    UseGuards 
} from "@nestjs/common";
import { CardService } from "./cards.service";
import { Role } from "src/users/roles/roles.enum";
import { Roles } from "src/users/decorators/roles.decorators";
import { JwtAuthGuard } from "src/users/auth/guards/jwt-auth.guard";


@Controller('commander')
@UseGuards(JwtAuthGuard)
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('get-deck')
    async getCard() { 
        return this.cardService.getCommanderDeck();
    }

    @Roles(Role.User, Role.Admin)
    @Post('create-deck')
    async createDeck (@Request() req, @Body() createDeckDto) {
        return this.cardService.createDeck(req.user.userId, createDeckDto);
    }

    @Roles(Role.User, Role.Admin)
    @Put('update-deck/:id')
    async updateDeck (@Param('id') id: string, @Request() req, @Body() updateDeckDto) {
        return this.cardService.updateDeck(req.user.userId, id, updateDeckDto);
    }

    @Roles(Role.User, Role.Admin)
    @Delete('delete-deck/:id')
    async deleteDeck (@Param('id') id: string, @Request() req) {
        return this.cardService.deleteDeck(req.user.userId, id);
    }

    @Roles(Role.Admin)  
    @Post('create-card')
    async createCard(@Request() req, @Body() createCardDto: any) {
        return this.cardService.create(req.user.userId, createCardDto);
  }
}