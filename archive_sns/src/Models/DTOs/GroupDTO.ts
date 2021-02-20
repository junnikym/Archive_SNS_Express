import { IsNotEmpty, Length, IsEmail, IsEmpty, IsString, IsArray, IsOptional } from "class-validator";
import { Group } from '../Entities/Group';

export class GroupDTO {
	
	@IsOptional()
	@Length(36)
	@IsString()
	public group_pk: string;

	@IsEmpty()
	@IsString()
	public title:string;

	@IsEmpty()
	@IsArray()
	public member_pk_list: string[];

	public toEntity(): Group{
		const { title } = this;

		const new_group = new Group();
		new_group.title = title;
		
		return new_group;
	}
}