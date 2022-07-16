export interface Modelfile {

    id_part: number;
    part_number: string;
    version: number;
    type_data: string;
    format_data: string;
    file_name: string;
    file_length: number;
    itemlink: string;
    license: string;
    author: string;
    memo: string;
    create_datetime: Date | null;
    latest_update_datetime: Date | null;
}