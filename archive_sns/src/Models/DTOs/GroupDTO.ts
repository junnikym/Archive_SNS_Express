import { IsNotEmpty, Length, IsEmail, IsEmpty, IsString, IsArray, IsOptional } from "class-validator";
import { Group } from '../Entities/Group';
import sanitizeHtml from 'sanitize-html';

export class GroupDTO {
	
	@IsOptional()
	@Length(36)
	@IsString()
	public group_pk: string;

	@IsNotEmpty()
	@IsString()
	public title:string;

	@IsNotEmpty()
	@IsArray()
	public member_pk_list: string[];

	@IsOptional()
	public highest_rank: number;

	@IsOptional()
	public lowest_rank: number;

	public toEntity(): Group{
		const { title } = this;

		const new_group = new Group();
		new_group.title = sanitizeHtml(title);
		
		return new_group;
	}
}