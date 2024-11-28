# View: vw_spiga_Caledario_Vistas

## Usa los objetos:
- [[Calendario_Vistas]]

```sql



CREATE VIEW [dbo].[vw_spiga_Caledario_Vistas] AS
SELECT 
ISNULL(ROW_NUMBER() OVER(ORDER BY (SELECT empresas)), 0) Id_,
* FROM  [192.168.90.10\SPIGAPLUS].[DMS00280].[DBO].[Calendario_Vistas]

```
