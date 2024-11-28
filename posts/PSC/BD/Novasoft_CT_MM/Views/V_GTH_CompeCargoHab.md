# View: V_GTH_CompeCargoHab

## Usa los objetos:
- [[GTH_CompeCargo]]
- [[GTH_Competencias]]

```sql
CREATE VIEW [dbo].[V_GTH_CompeCargoHab]
AS
SELECT  CC.cod_car, CC.cod_comp, CC.cod_calif, CC.niv_comp, CC.ind_hab, CC.fec_ini, CC.fec_fin,
		CASE
			WHEN CC.tip_comp = 1 THEN 'Área'
			WHEN CC.tip_comp = 2 THEN 'Nivel Cargo'
			WHEN CC.tip_comp = 3 THEN 'Cargo'
			WHEN C.ind_org = 1 THEN 'Organizacional'
		END AS tip_comp
FROM	dbo.GTH_CompeCargo AS CC
INNER	JOIN dbo.GTH_Competencias AS C ON CC.cod_comp = C.cod_comp
WHERE   (CC.ind_hab = 1) AND (CC.fec_fin IS NULL OR CC.fec_fin > GETDATE()) AND C.ind_des = 0

```
