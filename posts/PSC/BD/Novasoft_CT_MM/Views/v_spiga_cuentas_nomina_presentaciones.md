# View: v_spiga_cuentas_nomina_presentaciones

## Usa los objetos:
- [[InformesDatosArbol]]

```sql
CREATE  view [dbo].[v_spiga_cuentas_nomina_presentaciones] as
select distinct Empresa Codigo_Empresa,'CasaToro' Nombre_empresa,Balance Codigo_Balance,NombreBalance Descripcion_Balance,CodigoConcepto Codigo_Conceptos_Balance,
NombreConcepto Descripcion_Conceptos_Balance, Cuenta Cuentas,NombreCuenta Descripcion_Cuentas  
from InformesComiteDB..InformesDatosArbol
where Balance = 17 and Cuenta is not null
--order by CodigoConcepto,Cuenta

```
