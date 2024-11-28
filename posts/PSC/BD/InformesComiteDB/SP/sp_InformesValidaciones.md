# Stored Procedure: sp_InformesValidaciones

## Usa los objetos:
- [[InformesArboles]]
- [[InformesCodigosError]]
- [[InformesDatosArbol]]
- [[InformesDatosPresentaciones]]
- [[InformesLogEventos]]

```sql


CREATE PROCEDURE [dbo].[sp_InformesValidaciones]
AS
BEGIN

DECLARE @CodigoError INT = 0


	SET NOCOUNT ON;

-- CUENTAS DEL MOVIMIENTO NO ASICIADAS EN EL ARBOL

	IF (select count(*) from InformesDatosArbol t1 right join InformesDatosPresentaciones t2 on t1.Cuenta = t2.Cuenta where t1.Cuenta is null )>0
	BEGIN
             
        INSERT INTO InformesLogEventos (EventoOrigen, Empresa, Mensaje,Cuenta)
        SELECT 'DatosSede' AS Origen, t2.Empresa, 'La cuenta ' + t2.Cuenta + ' no aparece asociada' AS Mensaje,t2.Cuenta
        FROM InformesDatosArbol AS t1 RIGHT OUTER JOIN InformesDatosPresentaciones AS t2 ON t1.cuenta = t2.Cuenta
        WHERE (t1.cuenta IS NULL) AND (t2.Cuenta NOT LIKE '9%') AND (t2.Cuenta NOT LIKE '8%')
        GROUP BY t2.Empresa, t2.Cuenta

        --SELECT 'DatosSede' AS Origen, t2.Empresa, t2.Centro, 'La cuenta ' + t2.Cuenta + ' no aparece asociada' AS Mensaje,t2.Cuenta
        --FROM InformesDatosArbol AS t1 RIGHT OUTER JOIN InformesDatosPresentaciones AS t2 ON t1.cuenta = t2.Cuenta
        --WHERE (t1.cuenta IS NULL) AND (t2.Cuenta NOT LIKE '9%') AND (t2.Cuenta NOT LIKE '8%')
        --GROUP BY t2.Empresa, t2.Centro, t2.Cuenta

		SET @CodigoError = 1

	END

-- CONCEPTO SIN NATURALEZA ASOCIADA

	IF (select COUNT(*) from InformesArboles where DebeHaber = '' or DebeHaber is NULL)>0
	BEGIN

		INSERT INTO InformesLogEventos (EventoOrigen, Empresa, Centro, Mensaje,Concepto )		
			select 'InformesArboles' AS Origen,0 as Empresa,0 as Centro,'el concepto '+NombreConcepto+'('+cast(CodigoConcepto as char(3))+') no tiene naturaleza asociada' AS Mensaje,CodigoConcepto 
			from InformesArboles where DebeHaber = '' or DebeHaber is null

		SET @CodigoError = 2

	END

-- CUENTAS ASOCIADAS MAS DE UNA VEZ EN EL ARBOL

	IF EXISTS(select Cuenta from InformesDatosArbol WHERE Cuenta IS NOT NULL GROUP BY Cuenta,Balance HAVING COUNT(*)>1)
	BEGIN

		INSERT INTO InformesLogEventos (EventoOrigen, Empresa, Centro, Mensaje,Cuenta)		
			select 'InformesDatosArbol' AS Origen,0 Empresa,0 Centro,'La cuenta '+Cuenta+' se encuentra asociada mas de una vez ( '+cast(COUNT(*) as char(3))+')' MensajeError,Cuenta 
			from InformesDatosArbol WHERE Cuenta IS NOT NULL GROUP BY Cuenta,Balance  HAVING COUNT(*)>1

		SET @CodigoError = 3

	END

-- BORRA FILAS NUEVAS QUE NO SE HAN ORDENADO	
	
	--IF (Select count(*) from #TablaTemporal1 where Nivel1 = 0) > 0 BEGIN
	--	Insert into InformesLogEventos (EventoOrigen,Empresa,Centro,Mensaje) 
	--	Select 'DatosSedePyG',0,0,'Se encontro un Concepto sin nivel configurado - '+NombreConcepto+'('+rtrim(cast(CodigoConcepto as char(4)))+')' from InformesArboles where Nivel1 = 0

	--	SET @CodigoError = 4

	--END

	---Verficacion de arboles si encuentra con nivel 0 y devuelve error

	IF (Select count(*) from InformesArboles where Nivel1 = 0 and empresa<>0 And Balance <>0) > 0 BEGIN
		Insert into InformesLogEventos (EventoOrigen,Empresa,Centro,Mensaje) 
		Select 'DatosSedePyG',0,0,'Se encontro un Concepto sin nivel configurado - '+NombreConcepto+'('+rtrim(cast(CodigoConcepto as char(4)))+')' from InformesArboles where Nivel1 = 0

		SET @CodigoError = 4
	END



 SELECT CodigoError, MensageError FROM InformesCodigosError WHERE (CodigoError = @CodigoError)


END






```
