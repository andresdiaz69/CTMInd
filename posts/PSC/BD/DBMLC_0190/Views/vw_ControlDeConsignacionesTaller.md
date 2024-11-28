# View: vw_ControlDeConsignacionesTaller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE view [dbo].[vw_ControlDeConsignacionesTaller] as
select CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura
,NumeroFactura = Tipo2 + '\' + numero + '\' + año,CodigoMarca,NombreMarca,Tipo

from(

       select distinct (CedulaAsesorServicioResponsable)CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura
	   ,NumeroFacturaTaller,(Marcaveh)CodigoMarca,NombreMarca,('TAL')Tipo ,Año=substring(NumeroFacturaTaller,1,4),

       Numero = substring(NumeroFacturaTaller,(CHARINDEX('\',NumeroFacturaTaller,6)+1),5),

       Tipo2 = substring(NumeroFacturaTaller,6,(CHARINDEX('\',NumeroFacturaTaller,6)-1) - (CHARINDEX('\',NumeroFacturaTaller,1)))

       from ComisionesSpigaTallerPorOT

)a

```
