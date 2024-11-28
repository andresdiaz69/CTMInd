# View: v_Act_centros_sincr_TramitesCiudades

## Usa los objetos:
- [Tramite_Ciudades](Tramite_Ciudades.md)

```sql
CREATE VIEW [dbo].[v_Act_centros_sincr_TramitesCiudades] AS 
 
SELECT ciu ,Idciudad ,Ciudad ,descripcion ,departamento
FROM (
		SELECT SUBSTRING(descripcion,1,8) as ciu ,Idciudad ,Ciudad ,descripcion ,departamento
		from Tramite_Ciudades

)a

```
