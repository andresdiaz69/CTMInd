# View: vw_cMandos_ComisionesSpigaTallerPorOT_Coste

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[UnidadDeNegocio]]

```sql



CREATE VIEW [dbo].[vw_cMandos_ComisionesSpigaTallerPorOT_Coste]
AS

		Select distinct 
		Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, 
		CodigoCentro,Centro, CodigoSeccion, Seccion, isnull(Coste,0) Coste,NumOT,TipoOperacion,ltrim(rtrim(isnull(CodDepartamento,''))) CodDepartamento
		from ComisionesSpigaTallerPorOT a left join 
		UnidadDeNegocio b on a.CodigoEmpresa = b.CodEmpresa and a.CodigoCentro = b.CodCentro and a.CodigoSeccion = b.CodSeccion

```
