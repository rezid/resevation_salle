export interface SearchCriteria {
    name: string;
    value?: string;
}

export interface SearchCriteriaList {
    count: number;
    search_criteria_list: SearchCriteria[];
}

