package v1

type AddTagParams struct {
	Name      string `json:"name"`
	CreatedBy string `json:"created_by"`
	State     int8   `json:"state"`
}
