# View: v_GTH_ListParPro228

## Usa los objetos:
- [[GTH_Requisicion]]
- [[rhh_cargos]]

```sql
CREATE VIEW [dbo].[v_GTH_ListParPro228]
AS

	SELECT req.num_req, car.nom_car, req.cod_cia, req.cod_suc, req.cod_cco 
	FROM GTH_Requisicion req 
		INNER JOIN rhh_cargos car ON car.cod_car = req.car_sol AND car.cod_cia = req.cod_cia;


```
