import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Group } from '../Entities/Group';

export class GroupDTO {
	public title:string = null

	public toEntity(): Group{
		const { title } = this;

		const new_group = new Group();
		new_group.title = title;
		
		return new_group;
	}
}