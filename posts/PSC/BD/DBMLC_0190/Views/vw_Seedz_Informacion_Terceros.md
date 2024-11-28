# View: vw_Seedz_Informacion_Terceros

## Usa los objetos:
- [[spiga_Terceros]]

```sql
 create view [dbo].[vw_Seedz_Informacion_Terceros] as
 SELECT PkTerceros, FechaAlta, FechaMod, NifCif, Nombre, Apellido1, Apellido2, NombreComercial, FkTerceroClases, FkDocumentacionTipos
 FROM(
	 SELECT PkTerceros, FechaAlta, FechaMod, NifCif, Nombre, Apellido1, Apellido2, NombreComercial, FkTerceroClases, c.FkDocumentacionTipos 
	 FROM [PSCService_DB].dbo.spiga_Terceros c
	 WHERE FechaMod=(SELECT MAX(FechaMod) FROM [PSCService_DB].dbo.spiga_Terceros WHERE PkTerceros=c.PkTerceros)
 )a
  
 

```
