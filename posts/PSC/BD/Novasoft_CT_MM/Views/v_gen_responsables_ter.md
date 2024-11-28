# View: v_gen_responsables_ter

## Usa los objetos:
- [[gen_responsables]]
- [[gen_terceros]]
- [[rhh_cargos]]

```sql

CREATE VIEW [dbo].[v_gen_responsables_ter]
AS SELECT res.*,
		ter.ter_nombre,
		car.nom_car
   FROM gen_responsables AS res
   INNER JOIN gen_terceros AS ter ON res.ter_nit = ter.ter_nit
   INNER JOIN rhh_cargos AS car ON res.cod_car = car.cod_car;

```
